import express from 'express';

const middlewares = (app: any) => {
  // Middleware para JSON
  app.use(express.json());

  // Middleware para dados URL-encoded
  app.use(express.urlencoded({ extended: true }));
};

export default middlewares;
