import { capitalizeFirstLetter } from 'src/utils/helpers/helper-functions';
import { eModulePermission } from 'src/utils/types/entities.type';
import { eModule } from 'src/utils/entities.type';

export const modulePermissions = {};
export const roleModules = Object.keys(eModule).map((module) => {
  return {
    name: eModule[module],
    description: capitalizeFirstLetter(eModule[module].split('_').join(' '))
  }
});

roleModules.forEach((module) => {
  modulePermissions[module.name] = [
    {
      type: eModulePermission.VIEW,
      description: `View ${module.description.toLowerCase()}`
    },
    {
      type: eModulePermission.MANAGE,
      description: `Manage ${module.description.toLowerCase()}`
    }
  ]
});
