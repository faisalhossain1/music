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
     name: "World We Used To Know",
     path: "http://cdn.beatzjam.com/wp-content/uploads/2021/Alan-Walker-Winona-Oak-World-We-Used-to-Know-(BeatzJam.com).mp3?_=2",
     img: "https://i.ytimg.com/vi/4SYOIqyhA8I/maxresdefault.jpg",
     singer: "Artist : Alan Walker x Winona Oak"
   },
  {
     name: "Let Me Down Slowly",
     path: "https://gospelful.com/wp-content/uploads/2021/07/Alec-Benjamin-Let-Me-Down-Slowly-gospelfulcom.mp3",
     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFIxfnrfKtzBiqjt6RhFXdI1gTVXzAR0QRQ&usqp=CAU",
     singer: "Artist : Alec Benjamin"
   },
    {
     name: "Good Life",
     path: "https://cdn.beatzjam.com/wp-content/uploads/2021/G-Eazy-Kehlani-Good-Life-(BeatzJam.com).mp3?_=2",
     img: "https://i.ytimg.com/vi/USP42EeDu7w/maxresdefault.jpg",
     singer: "Artist : G-Eazy & Kehlani"
   },
   {
     name: "Paradise",
     path: "http://cdn.beatzjam.com/wp-content/uploads/2021/Alan-Walker-K-391-Boy-In-Space-Paradise-(BeatzJam.com).mp3?_=2",
     img: "https://wowplus.net/wp-content/uploads/2021/10/e34a26a779087e3ded8a034c4e78050928f00707-741x486.jpg",
     singer: "Artist : Alan Walker"
   },
   {
     name: "See You Again",
     path: "https://cdn.beatzjam.com/wp-content/uploads/2021/Wiz-Khalifa-ft-Charlie-Puth-See-You-Again-(BeatzJam.com).mp3?_=2",
     img: "https://edmboost.org/wp-content/uploads/2020/01/1-440-716x708.jpg",
     singer: "Artist : Wiz Khalifa"
   },
   {
     name: "Let Me Love You",
     path: "http://cdn.beatzjam.com/wp-content/uploads/2021/DJ-Snake-ft-Justin-Bieber-Let-Me-Love-You-(BeatzJam.com).mp3?_=2",
     img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/DJSnakeLetMeLoveYou.jpg/220px-DJSnakeLetMeLoveYou.jpg",
     singer: "Artist : DJ Snake x Justin Bieber"
   },
   {
     name: "Shape of You",
     path: "http://cdn.beatzjam.com/wp-content/uploads/2021/Ed-Sheeran-Shape-Of-You-(BeatzJam.com).mp3?_=2",
     img: "https://s3.amazonaws.com/secretsaucefiles/photos/images/000/120/955/large/Screen_Shot_2017-01-30_at_7.36.54_PM.png?1485823203",
     singer: "Artist : Ed Sheeran"
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
