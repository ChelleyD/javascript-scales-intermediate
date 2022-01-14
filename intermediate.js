const moment = require("moment");
const axios = require("axios");

/**
 * @param {array<number>} numbers - an array of numbers
 * @constraint implement this using built in Array functions; no for or while loops;
 * @return {array<number>} the original input array with negative numbers removed
 **/

function filter_out_negative_values(numbers){
    return numbers.filter(num => num >= 0);
}

/**
 * @param {array<number>} numbers - an array of numbers
 * @constraint implement this using built in Array functions; no for or while loops
 * @return {number} sum of all the negative numbers
 **/

function add_all_negative_values(numbers){
    let negatives = numbers.filter(num => num < 0);
    return negatives.reduce((prev, current) => prev + current);
}


/**
 * @param {string} name - someone's first name
 * @constraint use the https module and the api here: https://agify.io/
 * @return {number} the predicted age of that person
 **/

async function predict_age_by_name(name){
    let age = 0;
    await axios.get(`https://api.agify.io?name=${name}`).then(function (response) {
        
        // data = {...response.data, name: name, age: Math.floor((Math.random() * 100) + 1)};
        age = response.data.age;
    })
    return age;
}

/**
 * @param {string} artist - the name of a musician
 * @return {array<string>} an array of song titles by the given artist
 **/

async function list_songs_by(artist){
    let songsArr = [];
    await axios.get(`https://itunes.apple.com/search?term=${artist}&entity=musicVideo`).then(function (response) {
        let data = response.data.results   
        
        data.forEach(element => {
            songsArr.push(element.trackName);
        });
    })
    
    return songsArr; // replace with yours
}

/**
 * ----------------
   ----------------
   DON'T CHANGE ANYTHING BELOW THIS LINE
   ----------------
   ----------------
 *
 **/

// THIS IS A CHALLENGE

/**
 * @param {date_one} Date - a random date
 * @param {date_two} Date - a random date
 * @constraint implement this using the MomentJS module
 * @return {string} text representation of how many days are between the two given dates
 **/

function days_between(date_one, date_two){
    const d_one = moment(date_one);
    const d_two = moment(date_two);

    return Math.abs(d_one.diff(d_two, "days"));
}

/**
 * @param {string} uuid - a string that may or may not be a valid uuid
 * @return {boolean} whether the string is a valid uuid or not
 **/

function validate_uuid(uuid){
    const isValid = /^[0-9A-Za-z]{8}\-[0-9A-Za-z]{4}\-[0-9A-Za-z]{4}\-[0-9A-Za-z]{4}\-[0-9A-Za-z]{12}$/;
    return isValid.test(uuid);
}

const commands = [
    'days_between(new Date("June 14, 1989"), new Date("October 26, 2005"))',
    'validate_uuid("710b962e-041c-11e1-9234-0123456789ab")',
    'filter_out_negative_values([-84, 99, 42, -71, 54, -94, -26, 91, 13, 100, 17, -21])',
    'add_all_negative_values([-84, 99, 42, -71, 54, -94, -26, 91, 13, 100, 17, -21])'
];

for(const command of commands){
    console.log(`${command} = ${eval(command)}`);
}

async function run_async_functions(){
    console.log('predict_age_by_name("Christina") = ' + await predict_age_by_name("Christina"));
    console.log('list_songs_by("Beastie Boys") = ' + (await list_songs_by('Beastie Boys')).join(', '));
}

run_async_functions();