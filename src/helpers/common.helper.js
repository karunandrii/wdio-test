export function getDateMinusOne() {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const today = new Date();
    return `${today.getDate() - 1} ${months[today.getMonth()]} ${today.getFullYear()}`;
}

export function getRandomName(value, digits) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < digits; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(`Name of the ${value} is: `, `${value}_${text}`);
    return `${value}_${text}`;
}