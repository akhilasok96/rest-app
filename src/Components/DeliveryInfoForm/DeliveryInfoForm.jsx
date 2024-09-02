import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import DeliveryZoneTable from "../DeliveryZoneTable/DeliveryZoneTable";

const DeliveryInfoForm = () => {
  const [timeZone, setTimeZone] = useState("US/Central");
  const [deliveryPartner, setDeliveryPartner] = useState("None");
  const [enablePaymentCollection, setEnablePaymentCollection] = useState(false);
  const [enableFreeDelivery, setEnableFreeDelivery] = useState(false);
  const [enableDrawDeliveryZone, setEnableDrawDeliveryZone] = useState(false);
  const [enableTakeoutDiscount, setEnableTakeoutDiscount] = useState(false);
  const [enableTipInTookan, setEnableTipInTookan] = useState(false);
  const [disableDelivery, setDisableDelivery] = useState(false);
  const [disableTakeout, setDisableTakeout] = useState(false);
  const [disablePayOnDelivery, setDisablePayOnDelivery] = useState(false);
  const [disablePayAtStore, setDisablePayAtStore] = useState(false);
  const [enableAutoDeliveryRequest, setEnableAutoDeliveryRequest] =
    useState(false);
  const [closeRestaurant, setCloseRestaurant] = useState(false);

  return (
    <Paper
      elevation={5}
      sx={{ padding: { xs: 2, md: 4 }, marginTop: { xs: 2, md: 4 } }}
    >
      <Typography variant='h6' gutterBottom sx={{ marginBottom: "1.5rem" }}>
        Delivery Details
      </Typography>
      <Box component='form' noValidate autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='time-zone-select-label'>Time Zone</InputLabel>
              <Select
                labelId='time-zone-select-label'
                id='time-zone-select'
                value={timeZone}
                label='Time Zone'
                onChange={(e) => setTimeZone(e.target.value)}
              >
                <MenuItem value='Asia/Calcutta'>Asia/Calcutta</MenuItem>
                <MenuItem value='Canada/Atlantic'>Canada/Atlantic</MenuItem>
                <MenuItem value='Canada/Central'>Canada/Central</MenuItem>
                <MenuItem value='Canada/Eastern'>Canada/Eastern</MenuItem>
                <MenuItem value='Canada/Mountain'>Canada/Mountain</MenuItem>
                <MenuItem value='Canada/Newfoundland'>
                  Canada/Newfoundland
                </MenuItem>
                <MenuItem value='Canada/Pacific'>Canada/Pacific</MenuItem>
                <MenuItem value='Canada/Saskatchewan'>
                  Canada/Saskatchewan
                </MenuItem>
                <MenuItem value='Canada/Yukon'>Canada/Yukon</MenuItem>
                <MenuItem value='US/Alaska'>US/Alaska</MenuItem>
                <MenuItem value='US/Aleutian'>US/Aleutian</MenuItem>
                <MenuItem value='US/Arizona'>US/Arizona</MenuItem>
                <MenuItem value='US/Central'>US/Central</MenuItem>
                <MenuItem value='US/East-Indiana'>US/East-Indiana</MenuItem>
                <MenuItem value='US/Eastern'>US/Eastern</MenuItem>
                <MenuItem value='US/Hawaii'>US/Hawaii</MenuItem>
                <MenuItem value='US/Indiana-Starke'>US/Indiana-Starke</MenuItem>
                <MenuItem value='US/Michigan'>US/Michigan</MenuItem>
                <MenuItem value='US/Mountain'>US/Mountain</MenuItem>
                <MenuItem value='US/Pacific'>US/Pacific</MenuItem>
                <MenuItem value='US/Samoa'>US/Samoa</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enablePaymentCollection}
                  onChange={(e) => setEnablePaymentCollection(e.target.checked)}
                />
              }
              label='Enable Payment Collection'
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='Minimum Order Charge for Delivery'
              variant='outlined'
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='delivery-partner-select-label'>
                Delivery Partner
              </InputLabel>
              <Select
                labelId='delivery-partner-select-label'
                id='delivery-partner-select'
                value={deliveryPartner}
                label='Delivery Partner'
                onChange={(e) => setDeliveryPartner(e.target.value)}
              >
                <MenuItem value='None'>None</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Deliverable Distance Limit in Minimum Zone (KM)'
              variant='outlined'
              fullWidth
              type='number'
              InputProps={{ inputProps: { min: 0, step: 1 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Deliverable Distance Limit in Maximum Zone (KM)'
              variant='outlined'
              fullWidth
              type='number'
              InputProps={{ inputProps: { min: 0, step: 1 } }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Delivery Charge for Minimum Zone (0-4 KM)'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Delivery Charge for Maximum Zone (4-13 KM)'
              variant='outlined'
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableFreeDelivery}
                  onChange={(e) => setEnableFreeDelivery(e.target.checked)}
                />
              }
              label='Enable Free Delivery'
            />
          </Grid>

          {enableFreeDelivery && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='(Minimum Zone) Make Delivery Free After'
                  variant='outlined'
                  fullWidth
                  type='number'
                  InputProps={{ inputProps: { min: 0, step: 1 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='(Maximum Zone) Make Delivery Free After'
                  variant='outlined'
                  fullWidth
                  type='number'
                  InputProps={{ inputProps: { min: 0, step: 1 } }}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableDrawDeliveryZone}
                  onChange={(e) => setEnableDrawDeliveryZone(e.target.checked)}
                />
              }
              label='Enable Draw Delivery Zone'
            />
          </Grid>

          {enableDrawDeliveryZone && <DeliveryZoneTable />}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableTakeoutDiscount}
                  onChange={(e) => setEnableTakeoutDiscount(e.target.checked)}
                />
              }
              label='Enable Takeout Discount'
            />
          </Grid>

          {enableTakeoutDiscount && (
            <>
              <Grid item xs={12}>
                <TextField
                  label='Apply Takeout Discount Percentage'
                  variant='outlined'
                  fullWidth
                  type='number'
                  InputProps={{ inputProps: { min: 0, max: 100, step: 1 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Apply Takeout Discount Minimum Value'
                  variant='outlined'
                  fullWidth
                  type='number'
                  InputProps={{ inputProps: { min: 0, step: 1 } }}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <TextField
              label='Delivery Instructions'
              placeholder='Delivery Instructions'
              variant='outlined'
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableTipInTookan}
                  onChange={(e) => setEnableTipInTookan(e.target.checked)}
                />
              }
              label='Enable Tip In Tookan For Online Orders'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={disableDelivery}
                  onChange={(e) => setDisableDelivery(e.target.checked)}
                />
              }
              label='Disable Delivery'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={disableTakeout}
                  onChange={(e) => setDisableTakeout(e.target.checked)}
                />
              }
              label='Disable Takeout'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={disablePayOnDelivery}
                  onChange={(e) => setDisablePayOnDelivery(e.target.checked)}
                />
              }
              label='Disable Pay on Delivery'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={disablePayAtStore}
                  onChange={(e) => setDisablePayAtStore(e.target.checked)}
                />
              }
              label='Disable Pay at Store'
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableAutoDeliveryRequest}
                  onChange={(e) =>
                    setEnableAutoDeliveryRequest(e.target.checked)
                  }
                />
              }
              label='Enable Auto Delivery Request'
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={closeRestaurant}
                  onChange={(e) => setCloseRestaurant(e.target.checked)}
                />
              }
              label='Close Restaurant'
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' color='primary' fullWidth>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default DeliveryInfoForm;
