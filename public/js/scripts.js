let socket;
// var JSON_samplePack_Samples = [];
// var JSON_tracks = [];

var fr = 50;
var makeymakeyMode = false;

var isPlaying = false;

var bpm = 105;
var step_Type = 4;
//var bar_type = 4;

var bar = 60 / bpm * 1000;
var stepsResolution = 32;

var step = bar / stepsResolution;

///////////////////////////////////////////////
var currentStep = 0;
var update_timeout;
//////////////////////////////////////////////



// var all_samplePacks = [];
// var all_songs = [];
// var all_tracks = [];

function preload() {
  socket = io.connect();
  ////////////////////// CONVERT AND IMPORT JSON AS SAVE FILES /////////////////////////
    // getJSON();
    //////////////////////////////////////////////


    // song = document.createElement("audio");
    // song.scr = "../songs/skull-snaps-its-a-new-day-1973.mp3";

}

function setup() {

    // frameRate(fr);

    // all_tracks.forEach(track => {
    //     loadTrack(track);
    //     track.clips.forEach(clip => {
    //         loadDrumRack_clip(track, clip);
    //     });
    //     track.channels.forEach( channel => {
    //         console.log('channel : ');
    //         console.log(channel);
    //         // channel.sample.setVolume(1.0);
    //         // channel.sample.playMode(channel.sample.playMode);
    //     });
    // });

    // for (var channel of all_tracks[0].channels) {
    //     channel.sample.setVolume(1.0);
    //     channel.sample.playMode(JSON_samplePack_Samples.samples[channel.index].playmode);
    // }

    //////////////////////////////////////////
}

function draw() {

    //  A netoyer ?? // ( simplifier le code d'incrémentation )
    bar = 60 / bpm * 1000 * 4;
    step = bar / stepsResolution;
}

function update() {
    //////////////////////////////////////////////
    //  setTimeout("update()", step);
    update_timeout = setTimeout(() => {
        update(step);
    }, step);

    /////////////////////////////////////////////

    launchSteps(currentStep);

    /////////////////////////////////////////////

    currentStep += 1;
    console.log(currentStep);
    if (currentStep >= stepsResolution) {
        currentStep = 0;
    }
}

function changemakeymakeyMode() {

    if (makeymakeyMode == true) {
        makeymakeyMode = false;
        console.log("makeymakeyMode : " + makeymakeyMode);
    } else {
        makeymakeyMode = true;
        console.log("makeymakeyMode : " + makeymakeyMode);
    }
}

function sessionPlay() {

    sessionStop();

    isPlaying = true;
    update();
    //    start = Date.now();
}

function sessionStop() {

    isPlaying = false;
    currentStep = 0;
    clearTimeout(update_timeout);
    //    start = null;
}

function sessionPause() {

    isPlaying = false;
    clearTimeout(update_timeout);
    //    start = null;
}

function setBPMx(tValue) {
    bpm = tValue;
    console.log("Tempo changed to : " + bpm);
}


function previousScene() {

    for (var track of all_tracks) {

        track.currentClip -= 1;

        console.log(track.currentClip);
    }
}

function addScene () {

}

function nextScene() {

    for (var track of all_tracks) {

        track.currentClip += 1;

        console.log(track.currentClip);
    }
}

function launchSteps(currentStep) {

    all_tracks.forEach((track, track_index) => {
        let clip = track.clips[track.currentClip];
        let step = clip.steps[currentStep];
        let samplePack = all_samplePacks[track.samplePack];
        step.forEach((note, note_index) => {



            for (let k = 0; k < step.length; k++) {
                console.log(step[k]);
                console.log(j);
                if (step[k] == j) {
                    track.channels[j - 1].channel.sample.play();
                }
            }
        });
    });
    for (let i = 0; i < all_tracks.length; i++) {
        for (let j = 0; j <= track.channels.length; j++) {

        }
    }
}

function showTrack() {
    
}

function clip_Edit(track_ID, clip_ID) {

    console.log("track, " + all_tracks[track_ID] + " nbr of channels : " + all_tracks[track_ID].channels.length);
    document.getElementById("clip-editor").innerHTML = ` <div id="pads-container" class="d-inline p-0">
                                                                </div>
                                                                <div id="channels-container" class="d-inline p-0">
                                                                    <div id="channels-guide">
                                                                    </div>
                                                                </div>`;
    for (var channel of all_tracks[track_ID].channels) {
        loadDrumRack_Channel(channel, track_ID, clip_ID);
    }
}

function editStep(thiss, step, trackID, channelID, clipID) {
    ///////////////////////////////////

    var track = all_tracks[trackID];
    var clip = track.clips[clipID];
    var steps = clip.steps;

    var index = clip.steps.indexOf(step);
    // var index = step;

    // console.log("track : " + track);
    // console.log("clip : " + clip);
    console.log("steps : " + steps);
    // console.table("channel : " + channelID);
    // console.log("step : " + index);

    if (thiss.checked == false) {
        var supr = clip.steps[step].splice(index, 1);
        console.log("element supprimé : " + supr);
        console.log(supr);
    } else {
        console.log(step);
        clip.steps[step].splice(0, 0, track.channels[channelID].id + 1);
    }

}

function clip_Launch(track_ID, clip_ID) {
    console.log(track_ID);
    console.log(clip_ID);
    console.log(all_tracks);
    console.log(all_tracks[track_ID]);
    all_tracks[track_ID].currentClip = clip_ID;

    if (!isPlaying)
        sessionPlay();
}

function loadTrack(track) {
    //pour le "create new track"
    // var track = new Track(type);

    var tracksContainer = document.getElementById("tracks-container");
    var ttemplate = new track_Template(track);
    tracksContainer.innerHTML += ttemplate.html;
}

function loadDrumRack_clip(track, clip) {

    var clipsContainer = document.getElementById(track.name);
    var cliptemplate = new drumRackClip_Template(track, clip);
    clipsContainer.innerHTML += cliptemplate.html;

    // var stepsContainer = document.getElementById("channels-container");
    // var stepstemplate = new drumRackChannel_Template(clip);
    // stepsContainer.innerHTML += stepstemplate.html;
}


/////// Y INTEGRER LE FOR OF DE LA BOUCLE DE CHARGEMENT DU SETUP
function loadDrumRack_Channel(channel, trackID, clipID) {

    var track = all_tracks[trackID];
    var clip = track.clips[clipID];
    // var channel = track.channels[j - 1];

    if (channel != null) {
        var channelsGuide = document.getElementById("channels-guide");
        console.log("loaddrumRack_Channel : " + channel.sample);
        var drtemplate = new drumRackChannel_Template(channel, clipID);

        insertAfter(channelsGuide, drtemplate.element);
        ////////// RAJOUT DES STEPS DE LA PISTE //////////
        for (var step of clip.steps) {
            var drclips = new stepTemplate(track, channel, clip, step);
            //            drtemplate.appendChild(drclips);
            document.getElementById(`${channel.name + "_currentClip"}`).appendChild(drclips.element);
        }

    }
}

//////////////////////////////////
///////////////////////////
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
//////////////////////////////////
///////////////////////////















/* Pour plus tard, un système d'upload de samples */
/* ( Pour l'instant nous utiliserons exclusivement
une banque de samples prédéfinis par soucis de simplicité ) */
/*function loadSound(sample, channel) {

    var reader = new FileReader();
    reader.onload = function (e) {
      $('#sound_file')
        .attr('src', e.target.result);
        sound = e.target.result;
    };
    reader.readAsDataURL(sample.files[0]);
} */