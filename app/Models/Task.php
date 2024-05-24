<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public function createdBy()
    {
        return $this->hasOne(User::class, 'id', 'created_by');
    }

    public function updatedBy()
    {
        return $this->hasOne(User::class, 'id', 'updated_by');
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_user_id', 'id');
    }

    public function project()
    {
        return $this->hasOne(Project::class);
    }
}
