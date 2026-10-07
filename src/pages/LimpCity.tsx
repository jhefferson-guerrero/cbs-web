import { LimpCityHero } from '@/components/limpcity/LimpCityHero'
import { LimpCityAbout } from '@/components/limpcity/LimpCityAbout'
import { LimpCityCoverage } from '@/components/limpcity/LimpCityCoverage'
import { LimpCityServices } from '@/components/limpcity/LimpCityServices'
import { LimpCityCta } from '@/components/limpcity/LimpCityCta'

export function LimpCity() {
  return (
    <main>
      <LimpCityHero />
      <LimpCityAbout />
      <LimpCityCoverage />
      <LimpCityServices />
      <LimpCityCta />
    </main>
  )
}
