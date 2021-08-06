import Boom from '@hapi/boom';
import express from 'express';

export function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload },
  } = Boom.notFound();

  res.status(statusCode).json(payload);
}