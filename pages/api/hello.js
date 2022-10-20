// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import SIRUTA from "../../src/SIRUTA"

export default function handler(req, res) {
   res.send(SIRUTA.map( el => ({
    siruta: parseInt(el.siruta),
    denloc: decodeURI(el.denloc),
    parent: el.sirsup


   })))

}
