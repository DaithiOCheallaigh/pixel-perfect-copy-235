# Architecture rules

- Blog audio uses one useAudioPlayer hook instance (rendered once in BlogPost) shared by the Listen button and StickyAudioBar so both controls stay in sync; narrations are static MP3s at public/audio/blog/<post id>.mp3 declared by each post's `audio` entry, which src/test/blogAudio.test.ts checks against the files.
