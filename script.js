let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
  {
    name: "I'm A Mess",
    path: "https://faisalhossain1.github.io/audio-music/Bebe Rexha - I'm A Mess.mp3",
    img: "img/i'm_a_mess.jpg",
    singer: "Artist : Bebe Rexha"
  },
  {
    name: "OK (Visualizer)",
    path: "https://faisalhossain1.github.io/audio-music/Alan Walker x JOP - OK (Visualizer).mp3",
    img: "img/ok.jpg",
    singer: "Artist : JOP x Alan Walker"
  },
  {
    name: "Sabotage",
    path: "https://faisalhossain1.github.io/audio-music/Alvert Vishi X Bebe Rexha - Sabotage.mp3",
    img: "img/sabotage.jpg",
    singer: "Artist : Bebe Rexha X Albert Vishi"
  },
  {
    name: "Interlude",
    path: "https://faisalhossain1.github.io/audio-music/Alan Walker - Interlude.mp3",
    img: "img/interlude.jpg",
    singer: "Artist : Alan Walker"
  },
  {
    name: "Out Of Love",
    path: "https://faisalhossain1.github.io/audio-music/Alan Walker & Au_Ra - Out Of Love.mp3",
    img: "img/out-of-love.jpg",
    singer: "Artist : Au / Ra"
  },
  {
    name: "For You",
    path: "https://faisalhossain1.github.io/audio-music/Alan Walker & Dua Lipa - For You.mp3",
    img: "img/for-you.jpg",
    singer: "Artist : Alan Walker X Dua Lipa"
  },
  {
    name: "Faded (Restrung)",
    path: "https://faisalhossain1.github.io/audio-music/Alan Walker - Faded (Restrung).mp3",
    img: "img/faded.jpg",
    singer: "Artist : Iselin Solheim X Alan Walker"
  },
  {
    name: "Hello World",
    path: "https://faisalhossain1.github.io/audio-music/Alan Walker - Hello World feat. Torine.mp3",
    img: "img/hello-world.jpg",
    singer: "Artist : Torine X Alan Walker"
  },
  {
    name: "Fake A Smile",
    path: "https://faisalhossain1.github.io/audio-music/Alan Walker x salem ilese - Fake A Smile.mp3",
    img: "img/fake-a-smile.jpg",
    singer: "Artist : Salem Ilese X Alan Walker"
  },
  {
    name: "Love The Way You Lie",
    path: "https://faisalhossain1.github.io/audio-music/Rihanna ft. Albert Vishi - Love The Way You Lie.mp3",
    img: "img/love-the-way.jpg",
    singer: "Artist :  Albert Vishi X Alan Walker"
  },
];


// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }
