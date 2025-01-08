import express from 'express';

const middlewares = (app: any) => {
  // Middleware para JSON com limite configurado
  app.use(express.json({ limit: '10mb' }));

  // Middleware para dados URL-encoded com limite configurado
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
};

export default middlewares;
