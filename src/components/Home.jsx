// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Typography from '@mui/material/Typography';
// import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// export const Home = () => {
//     const preventDefault = (event) => event.preventDefault();
//     const CName = useSelector(state => state.user.custDetails.custName);
//     const navigate = useNavigate();
//     const newOrd = () => {
//         navigate('/newOrder')
//     }
//     const Ord = () => {
//         navigate('/Orders')
//     }
//     const ImageSrc = styled('span')({
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center 40%',
//     });

//     const Image = styled('span')(({ theme }) => ({
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: theme.palette.common.white,
//     }));

//     const ImageBackdrop = styled('span')(({ theme }) => ({
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         backgroundColor: theme.palette.common.black,
//         opacity: 0.4,
//         transition: theme.transitions.create('opacity'),
//     }));

//     const ImageMarked = styled('span')(({ theme }) => ({
//         height: 3,
//         width: 18,
//         backgroundColor: theme.palette.common.white,
//         position: 'absolute',
//         bottom: -2,
//         left: 'calc(50% - 9px)',
//         transition: theme.transitions.create('opacity'),
//     }));



//     return <div 
    
//     style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/basisLabait.jpg"})`, height: "90vh" }}>
//         <ImageSrc style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/basisLabait.jpg"})` }} />
//         <ImageBackdrop className="MuiImageBackdrop-root" />
//         <Image> <Typography component="span" variant="subtitle1" color="inherit" sx={(theme) => ({
//             fontFamily: "cursive",
//             position: 'relative', p: 4, pt: 2, pb: `calc(${theme.spacing(1)} + 6px)`,
//         })}>
//             <h1 style={{ fontSize: "xxx-large" }}>hello {CName}</h1>
//             <h2 style={{ fontSize: "xx-large" }}>wellcome To Your Way To Perfect Building</h2>
//             <span style={{}} onClick={newOrd}>new order</span><ImageMarked className="MuiImageMarked-root" />
//             <span onClick={Ord}>my old orders</span>
//             <ImageMarked className="MuiImageMarked-root" />
//                  </Typography>  </Image>


//     </div>
// }

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export const Home = () => {
    const preventDefault = (event) => event.preventDefault();
    const CName = useSelector(state => state.user.custDetails.custName);
    const navigate = useNavigate();
    const newOrd = () => {
        navigate('/newOrder')
    }
    const Ord = () => {
        navigate('/Orders')
    }
    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    const ActionButton = styled(Button)(({ theme }) => ({
        margin: theme.spacing(2),
        color: theme.palette.common.white,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: theme.palette.common.white,
        borderRadius: '25px',
        padding: '15px 40px',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        fontFamily: "'Varela Round', 'Assistant', sans-serif",
        transition: 'all 0.3s ease',
        minWidth: '220px',
        height: '70px',
        whiteSpace: 'nowrap',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transform: 'scale(1.05)',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
        },
    }));

    const ContentContainer = styled(Box)(({ theme }) => ({
        textAlign: 'center',
        padding: theme.spacing(4),
        borderRadius: '15px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(5px)',
        maxWidth: '900px',
        margin: '0 auto',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
    }));

    const TagLine = styled(Typography)(({ theme }) => ({
        color: '#f8f8f8',
        margin: theme.spacing(3, 0),
        fontStyle: 'italic',
        fontFamily: "'Heebo', 'Assistant', sans-serif",
        textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
    }));

    return <div 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/basisLabait.jpg"})`, height: "90vh" }}>
        <ImageSrc style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/basisLabait.jpg"})` }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image>
            <ContentContainer>
                <Typography 
                    variant="h1" 
                    component="h1" 
                    sx={{
                        fontFamily: "'Rubik', 'Assistant', sans-serif",
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                        fontWeight: 'bold',
                        marginBottom: 2,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        color: '#ffffff'
                    }}
                >
                    שלום {CName}
                </Typography>
                
                <Typography 
                    variant="h2" 
                    component="h2" 
                    sx={{
                        fontFamily: "'Rubik', 'Assistant', sans-serif",
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        marginBottom: 2,
                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                        color: '#f0f0f0'
                    }}
                >
                    ברוכים הבאים לדרך שלך לבניין מושלם
                </Typography>
                
                <TagLine variant="h5">
                    הזמנה ישירה מהיבואנים - מחירים ללא תחרות, איכות ללא פשרות 
                    
                </TagLine>
                
                <Box sx={{ my: 2 }}>
                    <Typography variant="body1" sx={{ 
                        color: '#e0e0e0', 
                        maxWidth: '700px', 
                        margin: '0 auto', 
                        lineHeight: 1.6,
                        fontSize: '1.1rem',
                        fontFamily: "'Assistant', 'Heebo', sans-serif",
                    }}>
                        באתר שלנו תוכלו להזמין חומרי בניין ישירות מהיבואנים המובילים בשוק, 
                        ללא פערי תיווך וללא המתנה מיותרת. אנו מתחייבים לאיכות מעולה, 
                        שירות מקצועי ומשלוחים מהירים לכל רחבי הארץ.
                    </Typography>
                </Box>
                
                <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item>
                        <ActionButton 
                            variant="outlined" 
                            onClick={newOrd}
                            startIcon={<span role="img" aria-label="new" style={{ fontSize: '1.5rem', marginRight: '8px' }}>🏗️</span>}
                        >
                            הזמנה חדשה
                        </ActionButton>
                    </Grid>
                    <Grid item>
                        <ActionButton 
                            variant="outlined" 
                            onClick={Ord}
                            startIcon={<span role="img" aria-label="history" style={{ fontSize: '1.5rem', marginRight: '8px' }}>📦</span>}
                        >
                            ההזמנות שלי
                        </ActionButton>
                    </Grid>
                </Grid>
                
                <Typography variant="subtitle1" sx={{ 
                    mt: 4, 
                    color: '#cccccc', 
                    fontSize: '0.95rem',
                    fontFamily: "'Assistant', 'Heebo', sans-serif",
                }}>
                    מחפשים ייעוץ מקצועי? צוות המומחים שלנו זמין עבורכם בכל שאלה 🛠️
                </Typography>
            </ContentContainer>
        </Image>
    </div>
}





