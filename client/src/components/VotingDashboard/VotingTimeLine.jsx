
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';


export default function VotingTimeline({ isOwner, WorkflowStatus }) {

  const steps = [
    {
      stepId: 0,
      stepLabel: "Registering Voters",
      icon:"",
      color:  "",
      variant: "",
    }
    ,
    {
      stepId: 1,
      stepLabel: "Proposals Registration started",
      icon:"",
      color:  "",
      variant: "",
    },
    {
      stepId: 2,
      stepLabel: "Proposals Registration Ended",
      icon: "",
      color:  "",
      variant: "",
    },
    {
      stepId: 3,
      stepLabel: "Voting Session Started",
      icon: "",
      color:  "",
      variant: "",
    },
    {
      stepId: 4,
      stepLabel: "Voting Session Ended",
      icon: "",
      color:  "",
      variant: "",
    },
    {
      stepId: 5,
      stepLabel: "Votes Tallied",
      icon: "",
      color:  "",
      variant: "",
    }
  ];

  const updateStep = (i) => {
    steps[i].color = "success";
    steps[i].variant = "filled";
    //steps[i].icon = RepeatIcon;
  };

  const getSteps = () => {
    updateStep(WorkflowStatus);
    return steps.map((r, i) => {
      return (
        <TimelineItem key={r.stepId}>
          <TimelineSeparator>
            <TimelineDot color={r.color} variant={r.variant} >
              {/* <r.icon/> */}
            </TimelineDot >
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          </TimelineSeparator>
          <TimelineContent >
            <Typography variant="h6" >
              {r.stepLabel}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      );
    });
  };



  return (
    <div id="VotingTimeLine_main">
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary" variant="filled">
              <HowToVoteIcon />
            </TimelineDot >
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>
        {getSteps()}
        {/* <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <FastfoodIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent >
            <Typography variant="h6" >
            Registering Voters
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent >
            <Typography variant="h6" component="span">
            Proposals Registration started
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <HotelIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          </TimelineSeparator>
          <TimelineContent >
            <Typography variant="h6" >
            Proposals Registration Ended
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            <TimelineDot color="secondary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent >
            <Typography variant="h6" component="span">
            Voting Session Started
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            <TimelineDot color="secondary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent >
            <Typography variant="h6" component="span">
            Voting Session Ended
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            <TimelineDot color="secondary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent >
            <Typography variant="h6" component="span">
            Votes Tallied
            </Typography>
          </TimelineContent>
        </TimelineItem> */}
      </Timeline>
    </div>
  );
}