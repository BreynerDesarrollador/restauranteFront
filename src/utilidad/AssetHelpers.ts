import React from 'react';

export const toAbsoluteUrl = (pathname: string) => {
    const urlFinal = process.env.API_URL + pathname
    console.log(urlFinal)
    return urlFinal;
}