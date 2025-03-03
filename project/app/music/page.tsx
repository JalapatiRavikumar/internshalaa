"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Search,
  Heart,
  Repeat,
  Shuffle
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock data for playlists
const MOCK_PLAYLISTS = [
  {
    id: 1,
    title: "Coding Focus",
    description: "Instrumental tracks to help you focus while coding",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww",
    tracks: [
      { id: 101, title: "Deep Focus", artist: "CodeBeats", duration: "3:45" },
      { id: 102, title: "Algorithm Flow", artist: "DevTunes", duration: "4:12" },
      { id: 103, title: "Syntax Harmony", artist: "CodeBeats", duration: "3:30" },
      { id: 104, title: "Debug Mode", artist: "Binary Sounds", duration: "5:20" },
      { id: 105, title: "Function Call", artist: "DevTunes", duration: "4:05" },
    ]
  },
  {
    id: 2,
    title: "Productivity Boost",
    description: "Energetic tracks to boost your productivity",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2R1Y3Rpdml0eXxlbnwwfHwwfHx8MA%3D%3D",
    tracks: [
      { id: 201, title: "Morning Momentum", artist: "WorkFlow", duration: "3:22" },
      { id: 202, title: "Task Crusher", artist: "Productive Beats", duration: "4:30" },
      { id: 203, title: "Sprint Session", artist: "Agile Sounds", duration: "3:15" },
      { id: 204, title: "Deadline Drive", artist: "WorkFlow", duration: "4:45" },
      { id: 205, title: "Project Complete", artist: "Productive Beats", duration: "3:50" },
    ]
  },
  {
    id: 3,
    title: "Creative Flow",
    description: "Inspiring tracks to enhance your creativity",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JlYXRpdml0eXxlbnwwfHwwfHx8MA%3D%3D",
    tracks: [
      { id: 301, title: "Idea Generator", artist: "Creative Minds", duration: "4:10" },
      { id: 302, title: "Design Flow", artist: "Artistic Waves", duration: "3:55" },
      { id: 303, title: "Inspiration Peak", artist: "Creative Minds", duration: "5:05" },
      { id: 304, title: "Concept Canvas", artist: "Artistic Waves", duration: "4:20" },
      { id: 305, title: "Innovation Stream", artist: "Thought Process", duration: "3:40" },
    ]
  },
  {
    id: 4,
    title: "Chill Coding",
    description: "Relaxed beats for casual coding sessions",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29kaW5nfGVufDB8fDB8fHww",
    tracks: [
      { id: 401, title: "Lazy Loop", artist: "Relaxed Dev", duration: "3:30" },
      { id: 402, title: "Casual Commit", artist: "Chill Code", duration: "4:15" },
      { id: 403, title: "Weekend Project", artist: "Relaxed Dev", duration: "3:50" },
      { id: 404, title: "Hobby Hack", artist: "Chill Code", duration: "4:40" },
      { id: 405, title: "Side Project Serenade", artist: "Passion Project", duration: "3:25" },
    ]
  }
];

export default function MusicPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<typeof MOCK_PLAYLISTS[0] | null>(null);
  const [currentTrack, setCurrentTrack] = useState<typeof MOCK_PLAYLISTS[0]['tracks'][0] | null>(null);
  const [volume, setVolume] = useState([80]);
  const [progress, setProgress] = useState([0]);
  const { toast } = useToast();

  const filteredPlaylists = MOCK_PLAYLISTS.filter(playlist => 
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying && !currentTrack && currentPlaylist) {
      // Start playing the first track of the current playlist
      setCurrentTrack(currentPlaylist.tracks[0]);
    }
    
    toast({
      title: isPlaying ? "Paused" : "Playing",
      description: currentTrack 
        ? `${currentTrack.title} by ${currentTrack.artist}` 
        : "No track selected",
    });
  };

  const handleSelectPlaylist = (playlist: typeof MOCK_PLAYLISTS[0]) => {
    setCurrentPlaylist(playlist);
    setCurrentTrack(null);
    setIsPlaying(false);
    setProgress([0]);
  };

  const handleSelectTrack = (track: typeof MOCK_PLAYLISTS[0]['tracks'][0]) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress([0]);
    
    toast({
      title: "Now Playing",
      description: `${track.title} by ${track.artist}`,
    });
  };

  const handleSpotifyConnect = () => {
    toast({
      title: "Spotify Integration",
      description: "Spotify connection feature coming soon!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r bg-card p-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Music</h2>
              <Button onClick={handleSpotifyConnect} size="sm" variant="outline" className="flex items-center">
                <Music className="h-4 w-4 mr-2" />
                Connect Spotify
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Your Playlists</h3>
            {filteredPlaylists.map(playlist => (
              <Button
                key={playlist.id}
                variant="ghost"
                className="w-full justify-start font-normal"
                onClick={() => handleSelectPlaylist(playlist)}
              >
                {playlist.title}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          {currentPlaylist ? (
            <div>
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-full md:w-48 h-48 rounded-md overflow-hidden">
                  <img 
                    src={currentPlaylist.imageUrl} 
                    alt={currentPlaylist.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{currentPlaylist.title}</h1>
                  <p className="text-muted-foreground mb-4">{currentPlaylist.description}</p>
                  <Button onClick={() => {
                    setCurrentTrack(currentPlaylist.tracks[0]);
                    setIsPlaying(true);
                  }}>
                    <Play className="h-4 w-4 mr-2" />
                    Play All
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-12 py-2 px-4 font-medium text-sm text-muted-foreground">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Title</div>
                  <div className="col-span-4">Artist</div>
                  <div className="col-span-2 text-right">Duration</div>
                </div>
                
                {currentPlaylist.tracks.map((track, index) => (
                  <div 
                    key={track.id}
                    className={`grid grid-cols-12 py-2 px-4 rounded-md hover:bg-muted cursor-pointer ${
                      currentTrack?.id === track.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => handleSelectTrack(track)}
                  >
                    <div className="col-span-1 flex items-center">
                      {currentTrack?.id === track.id && isPlaying ? (
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        </div>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="col-span-5 font-medium">{track.title}</div>
                    <div className="col-span-4 text-muted-foreground">{track.artist}</div>
                    <div className="col-span-2 text-right text-muted-foreground">{track.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlaylists.map(playlist => (
                <Card 
                  key={playlist.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectPlaylist(playlist)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={playlist.imageUrl} 
                      alt={playlist.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">{playlist.title}</h3>
                    <p className="text-sm text-muted-foreground">{playlist.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Player */}
      <div className="border-t bg-card p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {currentTrack && (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-muted rounded-md overflow-hidden">
                  {currentPlaylist && (
                    <img 
                      src={currentPlaylist.imageUrl} 
                      alt={currentPlaylist.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className="font-medium">{currentTrack.title}</div>
                  <div className="text-sm text-muted-foreground">{currentTrack.artist}</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center space-x-4 mb-2">
              <Button variant="ghost" size="icon" disabled={!currentTrack}>
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" disabled={!currentTrack}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                className="rounded-full" 
                onClick={handlePlayPause}
                disabled={!currentPlaylist}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" disabled={!currentTrack}>
                <SkipForward className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" disabled={!currentTrack}>
                <Repeat className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="w-full max-w-md flex items-center space-x-2">
              <div className="text-xs text-muted-foreground">
                {currentTrack ? "1:30" : "0:00"}
              </div>
              <Slider
                value={progress}
                min={0}
                max={100}
                step={1}
                onValueChange={setProgress}
                disabled={!currentTrack}
                className="flex-1"
              />
              <div className="text-xs text-muted-foreground">
                {currentTrack ? currentTrack.duration : "0:00"}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Button variant="ghost" size="icon" disabled={!currentTrack}>
              <Heart className="h-4 w-4" />
            </Button>
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={volume}
              min={0}
              max={100}
              step={1}
              onValueChange={setVolume}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}