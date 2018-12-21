const puppeteer = require('puppeteer');

const appUrlBase = 'http://risksoft.com.tr'
const routes = {
  public: {
    login: `${appUrlBase}/Login`
  }
}

let browser
let page
beforeAll(async () => {
  browser = await puppeteer.launch(
    process.env.DEBUG
      ? {
          headless: false,
          slowMo: 100,
        }
      : {}
  )
  page = await browser.newPage()
})

describe('Main Page', () => {
  test('Main page loads correctly', async () => {
    await page.goto(appUrlBase);
    const html = await page.$eval('.server_text h4', e => e.innerHTML)
    expect(html).toBe('RİSKSOFT İSG NEDİR?')

  })
})

describe('Login Page', () => {
  test('Login page loads correctly', async () => {
    await page.goto(routes.public.login);
    const html = await page.$eval('#login-button', e => e.innerHTML)
    expect(html).toBe('Giriş')

  })
})



afterAll(() => {
  if (!process.env.DEBUG) {
    browser.close()
  }
})