/**
 * Generates recipe images using Google Gemini / Imagen.
 * Usage: GOOGLE_API_KEY=your_key node scripts/generate-images.mjs
 * Get a free API key at: https://aistudio.google.com/apikey
 */

import { GoogleGenAI } from '@google/genai'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, '..', 'public', 'images', 'recipes')

const API_KEY = process.env.GOOGLE_API_KEY
if (!API_KEY) {
  console.error('❌  Set GOOGLE_API_KEY=your_key before running.')
  console.error('   Get a free key at https://aistudio.google.com/apikey')
  process.exit(1)
}

const ai = new GoogleGenAI({ apiKey: API_KEY })

mkdirSync(OUTPUT_DIR, { recursive: true })

const RECIPES = [
  { slug: 'broccoli-cheddar-rice',                 prompt: 'broccoli cheddar rice, creamy cheesy side dish in a white bowl' },
  { slug: 'veggie-rice',                            prompt: 'colorful vegetable rice with kale and carrots in a white bowl' },
  { slug: 'creamy-cilantro-lime-chicken-bowls',     prompt: 'meal prep chicken bowls with rice, sweet potato, broccoli and green sauce, top view' },
  { slug: 'pumpkin-pie',                            prompt: 'classic pumpkin pie slice with whipped cream on a white plate, fall dessert' },
  { slug: 'swedish-meatballs',                      prompt: 'Swedish meatballs in creamy gravy over egg noodles, cozy dinner' },
  { slug: 'pear-crisp',                             prompt: 'pear crisp with golden oat topping in a baking dish, served with ice cream' },
  { slug: 'pumpkin-protein-bars',                   prompt: 'stack of no-bake pumpkin protein bars with chocolate chips on parchment paper' },
  { slug: 'instant-pot-shredded-chicken',           prompt: 'shredded chicken in a white bowl, meal prep, top view' },
  { slug: 'taco-stuffed-sweet-potatoes',            prompt: 'taco stuffed sweet potato with ground beef, cheese, avocado and cilantro' },
  { slug: 'buffalo-chicken-strips',                 prompt: 'crispy baked buffalo chicken strips with ranch dipping sauce and celery' },
  { slug: 'bbq-meatloaf-muffins',                   prompt: 'individual BBQ meatloaf muffins on a baking sheet, glazed with BBQ sauce' },
  { slug: 'greek-chicken-kebabs',                   prompt: 'grilled Greek chicken kebabs with vegetables on skewers, served with tzatziki' },
  { slug: 'baked-fish-sticks',                      prompt: 'golden baked fish sticks with tartar sauce and lemon wedges on a white plate' },
  { slug: 'thai-coconut-curry-rice',                prompt: 'Thai coconut curry rice in a bowl with cilantro and lime, vibrant yellow color' },
  { slug: 'sweet-potato-pancakes',                  prompt: 'stack of fluffy sweet potato pancakes with maple syrup and pecans' },
  { slug: 'buffalo-chicken-egg-muffins',            prompt: 'buffalo chicken egg muffins in a muffin tin, golden and cheesy' },
  { slug: 'apple-cinnamon-baked-oatmeal',           prompt: 'apple cinnamon baked oatmeal cut into squares in a baking dish, fall breakfast' },
  { slug: 'apple-crisp-with-pecans',                prompt: 'apple crisp with pecan oat topping in a cast iron pan, warm and golden' },
  { slug: 'pumpkin-bread',                          prompt: 'sliced pumpkin bread loaf with crackly sugar top on a wooden cutting board' },
  { slug: 'sweet-potato-muffins',                   prompt: 'sweet potato muffins on a cooling rack, warm brown color, cozy fall baking' },
  { slug: 'greek-veggie-pasta-salad',               prompt: 'Greek pasta salad with feta, olives, cucumber, tomatoes in a large bowl, top view' },
  { slug: 'watermelon-cucumber-salad-with-feta',    prompt: 'watermelon cucumber salad with feta and mint, bright summer colors, top view' },
]

const PHOTO_STYLE = 'professional food photography, natural light, shallow depth of field, clean white or wood background, appetizing, restaurant quality, 4:3 ratio'

async function generateImage(slug, prompt) {
  const outPath = join(OUTPUT_DIR, `${slug}.jpg`)
  if (existsSync(outPath)) {
    console.log(`⏭  ${slug} — already exists, skipping`)
    return
  }

  console.log(`🎨  Generating: ${slug}`)
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: [{ parts: [{ text: `${prompt}, ${PHOTO_STYLE}` }] }],
      config: { responseModalities: ['IMAGE'] },
    })

    const parts = response.candidates?.[0]?.content?.parts ?? []
    const imagePart = parts.find(p => p.inlineData)
    if (!imagePart) throw new Error('No image in response')

    const imageBytes = Buffer.from(imagePart.inlineData.data, 'base64')
    writeFileSync(outPath, imageBytes)
    console.log(`✅  Saved: public/images/recipes/${slug}.jpg`)
  } catch (err) {
    console.error(`❌  Failed: ${slug} — ${err.message}`)
  }
}

// Run sequentially to avoid rate limits
for (const recipe of RECIPES) {
  await generateImage(recipe.slug, recipe.prompt)
  await new Promise(r => setTimeout(r, 1500)) // 1.5s between requests
}

console.log('\n🎉  Done! Run `npm run dev` to see the images on your site.')
