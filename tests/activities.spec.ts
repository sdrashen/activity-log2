import { test, expect } from '@playwright/test';

//acessar a aplicação e verificar se o título "Atividades" aparece na tela!
test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle('Create Next App');
});

test('atividades', async ({ page }) => {
  await page.goto('/activities');
  await expect(page.getByRole('heading', { name: 'Atividades' })).toBeVisible();
})