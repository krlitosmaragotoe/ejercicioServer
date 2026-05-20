import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import os from 'os';
import process from 'process';

const app = express();
const PORT = 3000;
const DB_FILE = './db.json';

app.use(cors());
app.use(express.json());

// ==========================================
// 🛠️ HELPERS: Manejo del JSON
// ==========================================
const readDB = async () => {
    try {
        const data = await fs.readFile(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { turnos: [], reservas: [], usuarios: [] };
    }
};

const writeDB = async (data) => {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

const generateId = () => Date.now().toString();

// ==========================================
// 🛡️ MIDDLEWARES: Validaciones
// ==========================================
const validateTurno = (req, res, next) => {
    const { fecha, horaInicio, horaFin, capacidadMaxima } = req.body;
    
    if (!fecha || !horaInicio || !horaFin || !capacidadMaxima) {
        return res.status(400).json({ error: 'Faltan datos obligatorios (fecha, horaInicio, horaFin, capacidadMaxima)' });
    }
    
    if (horaInicio >= horaFin) {
        return res.status(400).json({ error: 'La hora de inicio debe ser menor a la hora de fin' });
    }
    
    if (capacidadMaxima <= 0) {
        return res.status(400).json({ error: 'La capacidad máxima debe ser mayor a 0' });
    }
    
    next();
};

const validateReserva = (req, res, next) => {
    const { turnoId, nombreCliente, carnetIdentidad } = req.body;
    
    if (!turnoId || !nombreCliente || !carnetIdentidad) {
        return res.status(400).json({ error: 'Faltan datos obligatorios (turnoId, nombreCliente, carnetIdentidad)' });
    }
    
    next();
};

// ==========================================
// 🚀 ENDPOINTS CRUD: Turnos
// ==========================================
app.get('/api/turnos', async (req, res) => {
    const db = await readDB();
    res.json(db.turnos);
});

app.post('/api/turnos', validateTurno, async (req, res) => {
    const db = await readDB();
    const nuevoTurno = {
        id: generateId(),
        ...req.body,
        estado: 'activo'
    };
    db.turnos.push(nuevoTurno);
    await writeDB(db);
    res.status(201).json(nuevoTurno);
});

app.post('/api/login', async (req, res) => {
    const db = await readDB();
    const { email, password } = req.body;
    
    // Buscamos si existe el usuario con ese email y contraseña
    const admin = db.usuarios.find(u => u.email === email && u.password === password);
    
    if (admin) {
        const { password: _, ...userData } = admin; // Por seguridad no devolvemos el password
        res.json({ success: true, user: userData });
    } else {
        res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos.' });
    }
});

app.delete('/api/turnos/:id', async (req, res) => {
    const db = await readDB();
    db.turnos = db.turnos.filter(t => t.id !== req.params.id);
    await writeDB(db);
    res.json({ message: 'Turno eliminado' });
});

// ==========================================
// 🚀 ENDPOINTS CRUD: Reservas
// ==========================================
app.get('/api/reservas', async (req, res) => {
    const db = await readDB();
    res.json(db.reservas);
});

app.post('/api/reservas', validateReserva, async (req, res) => {
    const db = await readDB();
    
    // Validar existencia y cupo del turno
    const turno = db.turnos.find(t => t.id === req.body.turnoId);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });
    
    const reservasActivas = db.reservas.filter(r => r.turnoId === turno.id && r.estado !== 'cancelada');
    if (reservasActivas.length >= turno.capacidadMaxima) {
        return res.status(400).json({ error: 'No hay cupos disponibles' });
    }

    const nuevaReserva = {
        id: generateId(),
        ...req.body,
        fechaReserva: new Date().toISOString(),
        estado: 'confirmada'
    };
    
    db.reservas.push(nuevaReserva);
    await writeDB(db);
    res.status(201).json(nuevaReserva);
});

app.put('/api/reservas/:id/cancelar', async (req, res) => {
    const db = await readDB();
    const reserva = db.reservas.find(r => r.id === req.params.id);
    
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    
    reserva.estado = 'cancelada';
    await writeDB(db);
    res.json(reserva);
});

// ==========================================
// 🩺 ENDPOINTS: Salud del Sistema
// ==========================================
const getSystemInfo = async () => {
    // Calculo nativo de espacio en disco (Node 18+) para la raíz del sistema
    let diskUsage = 'No disponible';
    try {
        const stats = await fs.statfs('/');
        const totalDisk = stats.bsize * stats.blocks;
        const freeDisk = stats.bsize * stats.bfree;
        diskUsage = {
            totalGB: (totalDisk / 1e9).toFixed(2),
            libreGB: (freeDisk / 1e9).toFixed(2),
            usoGB: ((totalDisk - freeDisk) / 1e9).toFixed(2)
        };
    } catch (e) {
        diskUsage = 'Requiere privilegios o ruta específica';
    }

    return {
        estado: "online",
        timestamp: new Date().toISOString(),
        sistemaOperativo: {
            plataforma: os.platform(),
            arquitectura: os.arch(),
            version: os.release(),
            usuario: os.userInfo().username
        },
        memoriaRAM: {
            totalMB: (os.totalmem() / 1024 / 1024).toFixed(2),
            libreMB: (os.freemem() / 1024 / 1024).toFixed(2),
            enUsoMB: ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2)
        },
        cpuInfo: {
            modelo: os.cpus()[0].model,
            nucleos: os.cpus().length,
            cargaPromedio: os.loadavg() // [1, 5, 15] minutos
        },
        recursosServidorApp: {
            memoriaProcesoMB: (process.memoryUsage().rss / 1024 / 1024).toFixed(2),
            tiempoActivoSegundos: process.uptime().toFixed(2),
            cpuProceso: process.cpuUsage(), // microsegundos { user, system }
            discoRaiz: diskUsage
        }
    };
};

// Endpoint JSON
app.get('/health', async (req, res) => {
    const info = await getSystemInfo();
    res.json(info);
});

// Endpoint Archivo de Texto (.txt)
app.get('/health/report', async (req, res) => {
    const info = await getSystemInfo();
    
    const reportText = `
=============================================
REPORTE DE SALUD DEL SERVIDOR - SISTEMA TURNOS
=============================================
Fecha de reporte : ${info.timestamp}
Estado           : ${info.estado.toUpperCase()}

--- SISTEMA OPERATIVO ---
Plataforma       : ${info.sistemaOperativo.plataforma}
Arquitectura     : ${info.sistemaOperativo.arquitectura}
Versión          : ${info.sistemaOperativo.version}
Usuario          : ${info.sistemaOperativo.usuario}

--- HARDWARE Y RECURSOS TOTALES ---
CPU Modelo       : ${info.cpuInfo.modelo}
Nº de Núcleos    : ${info.cpuInfo.nucleos}
Carga CPU (avg)  : ${info.cpuInfo.cargaPromedio.map(c => c.toFixed(2)).join(', ')}

RAM Total        : ${info.memoriaRAM.totalMB} MB
RAM Libre        : ${info.memoriaRAM.libreMB} MB
RAM En Uso       : ${info.memoriaRAM.enUsoMB} MB

Disco (Raíz)     : Total ${info.recursosServidorApp.discoRaiz.totalGB} GB | Uso ${info.recursosServidorApp.discoRaiz.usoGB} GB

--- RECURSOS CONSUMIDOS POR EL PROCESO (NODE.JS) ---
RAM del Proceso  : ${info.recursosServidorApp.memoriaProcesoMB} MB
Uptime (Activo)  : ${info.recursosServidorApp.tiempoActivoSegundos} segundos
CPU Proceso (us) : User ${info.recursosServidorApp.cpuProceso.user} | System ${info.recursosServidorApp.cpuProceso.system}
=============================================
    `.trim();

    // Forzamos la descarga del archivo de texto
    res.setHeader('Content-disposition', 'attachment; filename=report.txt');
    res.setHeader('Content-type', 'text/plain');
    res.send(reportText);
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});