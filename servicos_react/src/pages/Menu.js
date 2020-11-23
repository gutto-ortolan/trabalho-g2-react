import React, { useState, useLayoutEffect } from 'react'

import {
    Button,
    Grid,
    Paper,
    TextField,
    Checkbox,
    MenuList,
    MenuItem,
}
    from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Firebase from '../services/FirebaseConnect'
import Footer from '../components/Footer'

export default function Menu() {
    let history = useHistory();

    const [screen, setScreen] = useState(0)

    const logoff = () => {
        sessionStorage.removeItem("uuid")
        Firebase
            .auth()
            .signOut()
            .then(() => {
                history.push("/");
            }).catch(() => {
                history.push("/");
            })
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item sm={10} xs={12}>

                </Grid>
                <Grid item sm={2} xs={12}>
                    <Button
                        onClick={logoff}
                        variant="contained"
                        color="primary"
                        >
                        Logoff
                    </Button>
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Grid item sm={12} xs={12}>
                        <Paper>
                            <MenuList>
                                <MenuItem onClick={() => setScreen(1)}>CRIMES</MenuItem>
                                <MenuItem onClick={() => setScreen(2)}>OUTRA COISA</MenuItem>
                            </MenuList>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

            <Footer/>
        </>
    )
}
