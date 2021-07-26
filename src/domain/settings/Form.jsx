import React from 'react'
import { Button, Divider } from '@mantine/core'
import { useForm, FormProvider } from 'react-hook-form'
import { InputText, InputTextarea } from '../../components/admin/Form'

import LogoImage from './LogoImage'

const SettingsForm = ({ onSubmit, loading, content }) => {
  const methods = useForm({ defaultValues: content })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input type="hidden" {...methods.register('id')} />
        <LogoImage className="mb-3" image={content.logo} />
        <Divider className="mb-3" variant="dotted" />
        <InputText
          className="mb-3"
          name="title"
          disabled={loading}
          maxLength="50"
        />
        <InputTextarea
          className="mb-3"
          name="description"
          disabled={loading}
          minRows={4}
          maxRows={8}
        />
        <Button
          type="submit"
          variant="light"
          radius="md"
          fullWidth
          disabled={loading}
        >
          Update Settings
        </Button>
      </form>
    </FormProvider>
  )
}

export default SettingsForm
