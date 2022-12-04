<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Misc (no access)
        $miscPermission = Permission::create(['name' => 'N/A']);
        // USER MODEL
        $userPermissionC = Permission::create(['name' => 'create: user']);
        $userPermissionR = Permission::create(['name' => 'read: user']);
        $userPermissionU = Permission::create(['name' => 'update: user']);
        $userPermissionD = Permission::create(['name' => 'delete: user']);

        // ROLE MODEL
        $rolePermissionC = Permission::create(['name' => 'create: role']);
        $rolePermissionR = Permission::create(['name' => 'read: role']);
        $rolePermissionU = Permission::create(['name' => 'update: role']);
        $rolePermissionD = Permission::create(['name' => 'delete: role']);

        // PERMISSION MODEL
        $permissionC = Permission::create(['name' => 'create: permission']);
        $permissionR = Permission::create(['name' => 'read: permission']);
        $permissionU = Permission::create(['name' => 'update: permission']);
        $permissionD = Permission::create(['name' => 'delete: permission']);

        // ADMINS
        $adminPermissionR = Permission::create(['name' => 'read: admin']);
        $adminPermissionU = Permission::create(['name' => 'update: admin']);

        // CREATE ROLES
        $userRole = Role::create(['name' => 'user'])->syncPermissions([
            $miscPermission,
        ]);

        $adminRole = Role::create(['name' => 'admin'])->syncPermissions([
            $userPermissionC,
            $userPermissionR,
            $userPermissionU,
            $userPermissionD,
            $rolePermissionC,
            $rolePermissionR,
            $rolePermissionU,
            $rolePermissionD,
            $permissionC,
            $permissionR,
            $permissionU,
            $permissionD,
            $adminPermissionR,
            $adminPermissionU,
        ]);

        $moderatorRole = Role::create(['name' => 'manager'])->syncPermissions([
            $userPermissionR,
        ]);
    }
}
