import React from 'react'
import { Text } from '@mantine/core'

import { data } from '../../../states/settings'

const Logo = () => {
  const settings = data.use()

  return (
    <div className="flex-shrink-0 flex items-center" style={{ width: '80px' }}>
      {settings?.logo ? (
        <img
          className="h-8 w-auto mx-auto md:mx-0"
          src={settings ? settings.logo?.data.secure_url : ''}
          alt="logo"
        />
      ) : (
        <Text size="lg" weight={700} color="blue">
          MDBLOG
        </Text>
      )}
    </div>
  )
}

export default Logo
