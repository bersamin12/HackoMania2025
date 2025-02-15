"use client"

import { useState } from "react"
import { AppBar, Toolbar, IconButton, Typography, Box, ThemeProvider, CssBaseline, Button } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { createTheme } from "@mui/material/styles"
import { Link } from 'react-router-dom';
import { TestimonialCard } from "../components/TestimonialCard"
import { DonationCard } from "../components/DonationCard"
import { type AddictionTab, addictionsTabData } from "../constants/constants" // refer to this for modular code 

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
})

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)

  const renderTabContent = (tab: AddictionTab) => (
    <>
      <DonationCard value={`$${tab.donation_amount.toFixed(2)}`} label="Total Donation Pool" />

      <DonationCard value={tab.number} label="Warriors on our Program" />

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {tab.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {tab.subtitle}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Programs to help {tab.category.toLowerCase()} addicts:
        </Typography>
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          <li>Counselling Sessions</li>
          <li>Sharing Sessions</li>
          <li>Redeem gifts to guide you on your journey</li>
        </ul>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Testimonials from our Warriors:
        </Typography>
        {tab.imageSrc.map((src, index) => (
          <TestimonialCard key={index} imageSrc={src} />
        ))}
      </Box>
    </>
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Status Bar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1, bgcolor: "white" }}>
          <Typography variant="body2">9:41</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {[...Array(3)].map((_, i) => (
              <Box key={i} sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "black" }} />
            ))}
          </Box>
        </Box>

        {/* App Bar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
              Title
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
                color="inherit"
                size="small"
                sx={{ mr: 1 }}
                component={Link}  // Use the 'Link' component for navigation
                to="/login"       // Navigate to the '/login' route
                >
                Login
            </Button>

            <Button
                color="inherit"
                size="small"
                sx={{ mr: 1 }}
                component={Link}  // Use the 'Link' component for navigation
                to="/register"    // Navigate to the '/register' route
                >
                Register
            </Button>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ px: 2, py: 3 }}>
          {/* Tabs */}
          <Box sx={{ display: "flex", borderBottom: 1, borderColor: "divider", mb: 2 }}>
            {addictionsTabData.map((tab, index) => (
              <Box
                key={index}
                onClick={() => setActiveTab(index)}
                sx={{
                  px: 2,
                  py: 1,
                  cursor: "pointer",
                  borderBottom: activeTab === index ? 2 : 0,
                  borderColor: activeTab === index ? "black" : "transparent",
                  fontWeight: activeTab === index ? "bold" : "normal",
                }}
              >
                {tab.category}
              </Box>
            ))}
            <Box sx={{ px: 2, py: 1 }}>{">"}</Box>
          </Box>

          {/* Recent Donation Alert */}
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            XXX has just donated $XXXX!
          </Typography>

          {/* Tab Content */}
          {renderTabContent(addictionsTabData[activeTab])}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

