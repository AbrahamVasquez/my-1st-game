let randomWord: string [] = [
    'COMPUTADORA',
    'TELEFONO',
    'VEHICULO',
    'GATO',
    'VETERINARIO',
    'GAMER',
    'NALGAS'
];

export function getRamdomWorld() {

    const randomIndex = Math.floor ( Math.random() * randomWord.length)

    return randomWord [ randomIndex ];
}