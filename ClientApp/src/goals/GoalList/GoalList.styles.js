export default theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 24,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing.unit}px auto`,
      width: '500px'
    },
  },
  addButton: {
    margin: `${theme.spacing.unit * 1}px`
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
