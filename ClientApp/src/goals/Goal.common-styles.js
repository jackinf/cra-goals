export default theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    [theme.breakpoints.up('md')]: {
      width: '500px'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  backButton: {
    margin: `${theme.spacing.unit * 1}px`
  },
  dateLabel: {
    fontSize: '0.8em'
  },
  centralizer: {
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing.unit}px auto`,
      width: '500px'
    }
  },
  loader: {
    width: '100%'
  }
});
