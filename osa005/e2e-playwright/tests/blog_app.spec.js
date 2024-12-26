const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Arto Hellas',
        username: 'hellas',
        password: 'salainen'
      }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()

      const notifierDiv = page.getByTestId('notifier')
      await expect(notifierDiv).toContainText('login ok')
      await expect(notifierDiv).toHaveCSS('border-style', 'solid')
      await expect(notifierDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'invalidPassword')

      const notifierDiv = page.getByTestId('notifier')
      await expect(notifierDiv).toContainText('wrong credentials')
      await expect(notifierDiv).toHaveCSS('border-style', 'solid')
      await expect(notifierDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'Welcome to the Babylon 5', 'Londo Mollari', 'https://testing123.com/')
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByTestId('bloglist')).toContainText('Welcome to the Babylon 5 Londo Mollari')
    })

    describe('when click view', async () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
      })

      test('blog can be liked', async ({ page }) => {
        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('blog can be removed', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Welcome to the Babylon 5 Londo Mollari'))
          .not.toBeVisible()
      })
    })

    describe('when adding more blog', async () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Linus, use the source', 'Richard Stallman', 'https://www.gnu.org/')
      })
      
      test('remove-button seen only by logged user', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'hellas', 'salainen')
        await createBlog(page, 'Foo Bar Lorem Itsum', 'Matti Maanantai', 'https://www.foobar.org/')

        await page.getByText('Welcome to the Babylon 5 Londo Mollari')
          .getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('Welcome to the Babylon 5 Londo Mollari')
          .getByRole('button', { name: 'remove' })).not.toBeVisible()


        await page.getByText('Linus, use the source Richard Stallman')
        .getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('Linus, use the source Richard Stallman')
          .getByRole('button', { name: 'remove' })).not.toBeVisible()

        await page.getByText('Foo Bar Lorem Itsum Matti Maanantai')
          .getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('Foo Bar Lorem Itsum Matti Maanantai')
          .getByRole('button', { name: 'remove' })).toBeVisible()
      })

      test('blogs ordered by most likes', async ({ page, request }) => {

        await page.getByText('Linus, use the source Richard Stallman')
          .getByRole('button', { name: 'view' }).click()
        await page.getByText('Linus, use the source Richard Stallman')
          .getByTestId('likeButton').click()

        await page.getByText('Linus, use the source Richard Stallman')
          .getByRole('button', { name: 'hide' }).click()

        const blogs = await page.getByTestId('bloglist').all()
        await expect(blogs[0].locator('..').first().filter({hasText: 'Linus, use the source Richard Stallman'})).toBeVisible()
        await expect(blogs[1].locator('..').last().filter({hasText: 'Welcome to the Babylon 5 Londo Mollari'})).toBeVisible()
      })
    })
  })
})
