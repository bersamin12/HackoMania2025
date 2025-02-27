import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

// Initialize Supabase client
const supabase = createClient(
  "https://qagsbbilljqjmauhylgo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZ3NiYmlsbGpxam1hdWh5bGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1OTczNzAsImV4cCI6MjA1NTE3MzM3MH0.5R8oQ9Zh_w6R7cDDhAU9xKZlMOk2jU3cCgO72uu91qU"
);

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    setError(null);
    setIsLoading(true);

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert('Check your email for the confirmation link!');
      navigate("/login");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <img src="/images/logo.png" alt="BreakFree Logo" style={{ height: "60px" }} />
      </Box>

      {/* Title */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Sign up for BreakFree
      </Typography>

      {/* Register Form Box */}
      <Card elevation={3} sx={{ borderRadius: 3, width: "100%" }}>
        <CardContent>
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Login Redirect */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 3 }}>
        <Typography variant="body2" sx={{ fontSize: "0.950rem", mr: 1 }}>
          Already have an account?
        </Typography>
        <Button onClick={() => navigate("/login")} size="small" sx={{ fontSize: "0.875rem" }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
