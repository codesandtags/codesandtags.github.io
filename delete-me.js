let messages = 'habia una iguana con una cara de rana'
.split(' ');

let activity = `proximo video`;
let name = '👩🏻‍💼 Churrita';

let message = `Hola  ${name}! ya estoy planeando cual será mi ${activity}.`;

messages.forEach(m => {
    console.log(m.padStart(10,'-'));
});