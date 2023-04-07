describe('App Component Testing', () => {
  it('should do some assertions', async () => {
    await App.open()
    await expect(App.heading).toHaveTitle('todo-list');
})
})
