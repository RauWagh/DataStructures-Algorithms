import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../store'
import App from '../App'

test('renders header and sections', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(screen.getByText(/Personalized Dashboard/i)).toBeInTheDocument()
  expect(screen.getByText(/Personalized Feed/i)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /Trending/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /Favorites/i })).toBeInTheDocument()
})
