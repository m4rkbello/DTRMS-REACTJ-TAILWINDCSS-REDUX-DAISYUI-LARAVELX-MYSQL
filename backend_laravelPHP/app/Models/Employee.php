<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_fullname',
        'employee_email',
        'employee_contact_no',
        'employee_position',
        'employee_role',
        'employee_department',
        'employee_status'
    ];

    public function attendances(){
        return $this->hasMany(Attendance::class, 'attendance_employee_id');
    }

}