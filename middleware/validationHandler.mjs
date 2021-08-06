import Boom from "@hapi/boom";
import express from 'express';

export function validationHandler(schema, check='body'){
    return async function (req, res, next) {
        try {
            const value = await schema.validateAsync(req[check]);
            next();
        }
        catch (err) {
            next(Boom.badRequest(err.message));
        }
    };
}