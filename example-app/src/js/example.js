import { Sim } from '@capgo/capacitor-sim';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    Sim.echo({ value: inputValue })
}
