import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const DeliveryZoneTable = () => {
  const [zones, setZones] = useState([
    {
      id: 1,
      title: "",
      deliveryCharge: "",
      deliveryEnablingOrderValue: "",
      enableFreeDelivery: false,
      deliveryFreeAfterOrder: "",
      enableZone: false,
    },
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:1200px)");

  const handleAddZone = () => {
    setZones([
      ...zones,
      {
        id: zones.length + 1,
        title: "",
        deliveryCharge: "",
        deliveryEnablingOrderValue: "",
        enableFreeDelivery: false,
        deliveryFreeAfterOrder: "",
        enableZone: false,
      },
    ]);
  };

  const handleRemoveZone = (id) => {
    setZones(zones.filter((zone) => zone.id !== id));
  };

  const handleZoneChange = (id, field, value) => {
    setZones(
      zones.map((zone) => (zone.id === id ? { ...zone, [field]: value } : zone))
    );
  };

  const handleUpdateZone = (id) => {
    console.log(`Zone ${id} updated!`);
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: { xs: 2, md: 4 }, marginTop: 2, marginLeft: 2 }}
    >
      <Box
        display='flex'
        flexDirection={isMobile ? "column" : "row"}
        justifyContent='space-between'
        alignItems={isMobile ? "flex-start" : "center"}
        gap={isMobile ? 2 : 0}
      >
        <Typography variant='h6'>Custom Draw Delivery Zone</Typography>
        <Button variant='contained' onClick={handleAddZone}>
          + Add New Zone
        </Button>
      </Box>

      {isMobile ? (
        // Mobile Layout (enabled for screen widths up to 1200px)
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {zones.map((zone) => (
            <Grid
              key={zone.id}
              container
              spacing={2}
              sx={{ marginBottom: 2, px: 2 }}
            >
              <Grid item xs={12}>
                <TextField
                  label='Title'
                  variant='outlined'
                  fullWidth
                  value={zone.title}
                  onChange={(e) =>
                    handleZoneChange(zone.id, "title", e.target.value)
                  }
                  sx={{ px: 2 }}
                  InputProps={{
                    sx: { paddingLeft: isMobile ? 2 : 0 },
                  }}
                  InputLabelProps={{
                    sx: { paddingLeft: isMobile ? 2 : 0 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Delivery Charge'
                  variant='outlined'
                  fullWidth
                  value={zone.deliveryCharge}
                  onChange={(e) =>
                    handleZoneChange(zone.id, "deliveryCharge", e.target.value)
                  }
                  sx={{ px: 2 }}
                  InputProps={{
                    sx: { paddingLeft: isMobile ? 2 : 0 },
                  }}
                  InputLabelProps={{
                    sx: { paddingLeft: isMobile ? 2 : 0 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Delivery Enabling Order Value'
                  variant='outlined'
                  fullWidth
                  value={zone.deliveryEnablingOrderValue}
                  onChange={(e) =>
                    handleZoneChange(
                      zone.id,
                      "deliveryEnablingOrderValue",
                      e.target.value
                    )
                  }
                  sx={{ px: 2 }}
                  InputProps={{
                    sx: { paddingLeft: isMobile ? 2 : 0 },
                  }}
                  InputLabelProps={{
                    sx: { paddingLeft: isMobile ? 2 : 0 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={zone.enableFreeDelivery}
                      onChange={(e) =>
                        handleZoneChange(
                          zone.id,
                          "enableFreeDelivery",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label='Enable Free Delivery'
                  sx={{ px: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Delivery Free After Order'
                  variant='outlined'
                  fullWidth
                  value={zone.deliveryFreeAfterOrder}
                  onChange={(e) =>
                    handleZoneChange(
                      zone.id,
                      "deliveryFreeAfterOrder",
                      e.target.value
                    )
                  }
                  sx={{ px: 2 }}
                  InputProps={{
                    sx: { paddingLeft: isMobile ? 2 : 0 },
                  }}
                  InputLabelProps={{
                    sx: { paddingLeft: isMobile ? 2 : 0 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='outlined'
                  color='primary'
                  fullWidth
                  onClick={() => handleUpdateZone(zone.id)}
                  sx={{ px: 2 }}
                >
                  Update Zone
                </Button>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={zone.enableZone}
                      onChange={(e) =>
                        handleZoneChange(
                          zone.id,
                          "enableZone",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label='Enable Zone'
                  sx={{ px: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <IconButton
                  color='secondary'
                  onClick={() => handleRemoveZone(zone.id)}
                  size='large'
                  sx={{ px: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Desktop Layout
        <TableContainer sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: { xs: 3, md: 2 } }}>Title</TableCell>
                <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                  Delivery Charge
                </TableCell>
                <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                  Delivery Enabling Order Value
                </TableCell>
                <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                  Enable Free Delivery
                </TableCell>
                <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                  Delivery Free After Order
                </TableCell>
                <TableCell sx={{ px: { xs: 3, md: 2 } }}>Update Zone</TableCell>
                <TableCell sx={{ px: { xs: 3, md: 2 } }}>Enable Zone</TableCell>
                <TableCell sx={{ px: { xs: 3, md: 2 } }}>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      value={zone.title}
                      onChange={(e) =>
                        handleZoneChange(zone.id, "title", e.target.value)
                      }
                      InputProps={{
                        sx: { paddingLeft: isMobile ? 2 : 0 },
                      }}
                      InputLabelProps={{
                        sx: { paddingLeft: isMobile ? 2 : 0 },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      value={zone.deliveryCharge}
                      onChange={(e) =>
                        handleZoneChange(
                          zone.id,
                          "deliveryCharge",
                          e.target.value
                        )
                      }
                      InputProps={{
                        sx: { paddingLeft: isMobile ? 2 : 0 },
                      }}
                      InputLabelProps={{
                        sx: { paddingLeft: isMobile ? 2 : 0 },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      value={zone.deliveryEnablingOrderValue}
                      onChange={(e) =>
                        handleZoneChange(
                          zone.id,
                          "deliveryEnablingOrderValue",
                          e.target.value
                        )
                      }
                      InputProps={{
                        sx: { paddingLeft: isMobile ? 2 : 0 },
                      }}
                      InputLabelProps={{
                        sx: { paddingLeft: isMobile ? 2 : 0 },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={zone.enableFreeDelivery}
                          onChange={(e) =>
                            handleZoneChange(
                              zone.id,
                              "enableFreeDelivery",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label='Free'
                    />
                  </TableCell>
                  <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      value={zone.deliveryFreeAfterOrder}
                      onChange={(e) =>
                        handleZoneChange(
                          zone.id,
                          "deliveryFreeAfterOrder",
                          e.target.value
                        )
                      }
                      InputProps={{
                        sx: { paddingLeft: isMobile ? 2 : 0 },
                      }}
                      InputLabelProps={{
                        sx: { paddingLeft: isMobile ? 2 : 0 },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={() => handleUpdateZone(zone.id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={zone.enableZone}
                          onChange={(e) =>
                            handleZoneChange(
                              zone.id,
                              "enableZone",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label='Enable'
                    />
                  </TableCell>
                  <TableCell sx={{ px: { xs: 3, md: 2 } }}>
                    <IconButton
                      color='secondary'
                      onClick={() => handleRemoveZone(zone.id)}
                      size='medium'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default DeliveryZoneTable;
