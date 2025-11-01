const TVA = 0.19

const calculeazaPretCuTVA = (pret) => {
    return pret + (pret * TVA)
}

export { TVA, calculeazaPretCuTVA }