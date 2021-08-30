import React, {useContext, Fragment, useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import { Link } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';

///////////////////////////////////////////////////////////////////////////
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      }
    },
    paper: {
      marginRight: theme.spacing(2),
    },
   
  }));

  const theme = createTheme({
    palette: {
        primary: {
          main: '#00e676',
        },
        secundary: {
          main: '#ffffff',
        },
      },
  });
  /////////////////////////////////////////////////////////////////////////

const Barra = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion  } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    const theme = createTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        }
    }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);



    return ( 
        <Fragment>

       <header className="app-header">
            
            {usuario ? <p className="nombre-usuario" ><span>{usuario.nombre} </span> </p> : null}

        {(usuario.tipo!=='bodega') ? 
            
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
            <h4>MENU</h4>
            </Button>

            :

            null
        
        
        }
            
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        {/* <MenuItem onClick={handleClose}><Link to={'/pagos'} className="">Registro de Pagos</Link></MenuItem> */}
                        <MenuItem onClick={handleClose}><Link to={'/pedidos'} className="">Registro de Pedidos</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to={'/edita'} className="">Edita Pedidos</Link></MenuItem>
                        
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>

            <Button color='secundary' onClick={() => cerrarSesion() }>Cerrar Sesión</Button>


            {/* {usuario.tipo!==('bodega') ? 
            
            <nav className="nav-principal">
            <Link to={'/pagos'} className="">
                    Registro de Pagos
                </Link>
            </nav>
            
            
            : null}

            {usuario.tipo!==('bodega') ? 
            
            <nav className="nav-principal">
            <Link to={'/edita'} className="">
                    Editar Pedidos
                </Link>
            </nav>
            
            
            : null}
            
            <nav className="nav-principal">
            <Link to={'/pedidos'} className="">
                    Registro de Pedidos
                </Link>
            </nav>
            
            
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion() }
                >Cerrar Sesión</button>
            </nav> */}
        </header>
     
        </Fragment>
     );
}
 
export default Barra;