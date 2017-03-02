import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  emptyContainer: {
    marginVertical: 40,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#EBF1F5',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    flexDirection: 'row',
  },
  button: {
    height: 35,
  },
  Text: {
    marginBottom: 10,
  },
  TextInput: {
    borderColor: '#999',
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  toolbarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 15,
    height: 'auto',
  },
  toolbarChild: {
    marginRight: 30,
  },
  SelectContainer: {
    flexGrow: 1,
  },
});

export default styles;
