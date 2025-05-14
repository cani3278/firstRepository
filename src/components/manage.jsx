import * as React from 'react';
import { Box, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';

export const Manage = () => {
  const navigate = useNavigate();
  
  const managementOptions = [
    {
      title: 'Employees',
      icon: <PersonIcon fontSize="large" />,
      description: 'ניהול עובדים, הוספה, עריכה ומחיקה',
      navigateTo: 'ManageEmployees',
      color: '#3f51b5'
    },
    {
      title: 'Products',
      icon: <InventoryIcon fontSize="large" />,
      description: 'ניהול מוצרים, מלאי ומחירים',
      navigateTo: 'ManageProducts',
      color: '#f50057'
    },
    {
      title: 'Customers',
      icon: <PeopleIcon fontSize="large" />,
      description: 'ניהול לקוחות והזמנות',
      navigateTo: 'ManageCustomers',
      color: '#00a152'
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        align="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          color: '#333',
          mb: 4
        }}
      >
        ברוך הבא, מנהל
      </Typography>
      
      <Grid container spacing={4}>
        {managementOptions.map((option) => (
          <Grid item xs={12} md={4} key={option.title}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                  cursor: 'pointer'
                }
              }}
              onClick={() => navigate(option.navigateTo)}
            >
              <Box 
                sx={{ 
                  p: 2, 
                  borderRadius: '50%', 
                  backgroundColor: `${option.color}20`,
                  color: option.color,
                  mb: 2
                }}
              >
                {option.icon}
              </Box>
              <Typography variant="h5" component="h2" gutterBottom>
                {option.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {option.description}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button 
                variant="contained" 
                sx={{ 
                  mt: 3,
                  backgroundColor: option.color,
                  '&:hover': {
                    backgroundColor: option.color,
                    filter: 'brightness(90%)'
                  }
                }}
                onClick={() => navigate(option.navigateTo)}
              >
                כניסה לניהול
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


