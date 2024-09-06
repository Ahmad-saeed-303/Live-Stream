import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
    ParticipantView,
    useCall,
    useCallStateHooks
  } from '@stream-io/video-react-sdk'
  

export const MyLivestreamUI = () => {
    const call = useCall();
    const { useIsCallLive, useLocalParticipant, useParticipantCount } = useCallStateHooks();
    
    const [showSurvey, setShowSurvey] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const videoRef = useRef<HTMLDivElement>(null);
  
    const totalParticipants = useParticipantCount();
    const localParticipant = useLocalParticipant();
    const isCallLive = useIsCallLive();
  
    useEffect(() => {
      if (isCallLive) {
        const timer = setTimeout(() => {
          setShowSurvey(true);
        },  10000); 
  
        return () => clearTimeout(timer);
      }
    }, [isCallLive]);
  
    const handleFullScreen = () => {
      if (videoRef.current) {
        if (!isFullScreen) {
          videoRef.current.requestFullscreen();
          setIsFullScreen(true);
        } else {
          document.exitFullscreen();
          setIsFullScreen(false);
        }
      }
    };
  
    const handleClose = () => {
      setShowSurvey(false);
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div
          style={{
            alignSelf: "flex-start",
            color: 'white',
            backgroundColor: 'blue',
            borderRadius: '8px',
            padding: '4px 6px'
          }}
        >
          Live: {totalParticipants}
        </div>
        <div ref={videoRef} style={{
             flex: 1,
             width: '500px',
             height: '500px',
             position: 'relative',
             borderRadius:'20px' }}>
          {localParticipant && (
            <ParticipantView
              participant={localParticipant}
              ParticipantViewUI={null}
            />
          )}
          <button 
            onClick={handleFullScreen} 
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              padding: '8px 12px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
        
        <Dialog open={showSurvey} onClose={handleClose}>
          <DialogTitle>Survey</DialogTitle>
          <DialogContent>
            <form>
              <div style={{ marginBottom: '10px' }}>
                <Select fullWidth defaultValue="">
                  <MenuItem value="" disabled>
                    How do you rate the live stream?
                  </MenuItem>
                  <MenuItem value="excellent">Excellent</MenuItem>
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="average">Average</MenuItem>
                  <MenuItem value="poor">Poor</MenuItem>
                </Select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Any comments?"
                  variant="outlined"
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }