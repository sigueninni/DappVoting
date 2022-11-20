import * as React from 'react';
import useEth from "../../contexts/EthContext/useEth";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { purple } from '@mui/material/colors';
import { pink } from '@mui/material/colors';

function CardPerson({ address }) {

    const { state: { owner } } = useEth();
    return (
        <div key="{address}" id="CardPerson_main">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar=
                    {owner === address ? <Avatar sx={{ bgcolor: purple[900] }} aria-label="recipe">
                        A
                    </Avatar> :
                        <Avatar sx={{ bgcolor: pink[900] }} aria-label="recipe">
                            V
                        </Avatar>}

                    title={address}
                    subheader={owner === address ? "Role : Vote Admin" : "Role : Voter"}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {owner === address ? "The admin can manage the workflow of the Vote session but not vote." : "The Voter can give a proposal and can vote."}
                    </Typography>
                </CardContent>
                {/*      <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                           List of possible actions
                        </Typography>
                    </CardContent>
                </Collapse> */}
            </Card>


            {/*    <Card sx={{ maxWidth: 345  }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="../assets/contemplative-reptile.jpg"
                    alt={isOwner? "Owner du contrat" : "Voter" }
                />
                <CardContent>
                    <Typography gutterBottom variant="h8" color="secondary" component="div">
                    Role : {isOwner? "Owner " : "Voter" }
                    </Typography>
                    <Typography variant="body2" >
                    
                    </Typography>
                </CardContent>
            </Card> */}
        </div>
    );
}

export default CardPerson;