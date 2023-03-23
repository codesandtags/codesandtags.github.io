export default function sayHello() {
    let msg = `%c

   __                                                 
  /  )     /                       /   _/_            
 /   __ __/ _  _     __.  ____  __/    /  __.  _,  _  
(__/(_)(_/_</_/_)_  (_/|_/ / <_(_/_   <__(_/|_(_)_/_)_
                                               /|     
                                              |/      

%c🍻 la última y nos vamos!
`;
    let styles = [
        'font-family: monospace',
        'color: lightblue'
    ].join(';')
    let styles2 = [
        'font-size: 24px',
        'font-family: monospace',
        'color: lightblue',
        'font-weight: bold'
    ].join(';') 
    console.log(msg, styles, styles2);
}