import Boom from "@hapi/boom";
import express from "express";

export function errorHandler(err, req, res, next){
    const {
        output : { statusCode, payload },
    } = err;
    res.status(statusCode || 500);
    res.json(err.message);
}