import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle('Create Next App');
});

test('atividades', async ({ page }) => {
  await page.goto('/activities');
  await expect(page.getByRole('heading', { name: 'Atividades' })).toBeVisible();
});

test('preenche campos para adicionar atividade', async ({ page }) => {
  await page.goto('/activities');
  await page.getByPlaceholder('O que você fez?').fill('Estudar Playwright');
  await page.locator('input[name="startTime"]').fill('2026-09-02T09:00');
  await page.locator('input[name="endTime"]').fill('2026-09-02T10:00');
  await page.getByRole('button', { name: 'Adicionar atividade' }).click();
  await expect(page.getByText('Estudar Playwright').first()).toBeVisible();
});

test('Excluir atividade', async ({ page }) => {
  const nome = `Atividade única ${Date.now()}`
  await page.goto('/activities');
  await page.getByPlaceholder('O que você fez?').fill(nome);
  await page.locator('input[name="startTime"]').fill('2026-09-02T09:00');
  await page.locator('input[name="endTime"]').fill('2026-09-02T10:00');
  await page.getByRole('button', { name: 'Adicionar atividade' }).click();
  await expect(page.getByText(nome)).toBeVisible();
  
  // Encontra o card da atividade e clica em Remover dentro dele
  await page.getByText(nome).locator('..').locator('..').getByRole('button', { name: 'Remover' }).click();
  
  await page.waitForTimeout(2000);
  await expect(page.getByText(nome)).not.toBeVisible();
});

test('Editar atividade', async ({ page }) => {
  const nome = `Atividade única ${Date.now()}`
  await page.goto('/activities');
  await page.getByPlaceholder('O que você fez?').fill(nome);
  await page.locator('input[name="startTime"]').fill('2026-09-02T09:00');
  await page.locator('input[name="endTime"]').fill('2026-09-02T10:00');
  await page.getByRole('button', { name: 'Adicionar atividade' }).click();
  await expect(page.getByText(nome)).toBeVisible();
  
  await page.getByText(nome).locator('..').locator('..').getByRole('button', { name: 'Editar' }).click();
  
  // Usa o formulário de edição especificamente
  const editForm = page.locator('form').filter({ hasText: 'Editar atividade' })
  await editForm.getByPlaceholder('O que você fez?').fill(`Editado: ${nome}`)
  await editForm.locator('input[name="startTime"]').fill('2026-09-02T11:00')
  await editForm.locator('input[name="endTime"]').fill('2026-09-02T12:00')
  await editForm.getByRole('button', { name: 'Salvar alterações' }).click()
  
  await expect(page.getByText(`Editado: ${nome}`)).toBeVisible();
});

test('Validação de campos obrigatórios', async ({ page }) => {
  await page.goto('/activities');
  await page.locator('input[name="startTime"]').fill('2026-09-02T09:00');
  await page.locator('input[name="endTime"]').fill('2026-09-02T10:00');
  await page.getByRole('button', { name: 'Adicionar atividade' }).click();
  await expect(page.getByText('A descrição é obrigatória.')).toBeVisible();
});