# Generated by Django 5.1 on 2024-09-03 04:49

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_programaacademico_historicaluser_role_user_role_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='estudiante',
            name='programa_academico',
        ),
        migrations.RemoveField(
            model_name='usuariobienestar',
            name='user',
        ),
        migrations.RemoveField(
            model_name='estudiante',
            name='id',
        ),
        migrations.RemoveField(
            model_name='estudiante',
            name='user',
        ),
        migrations.AddField(
            model_name='estudiante',
            name='user_ptr',
            field=models.OneToOneField(auto_created=True, default=1, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='ProgramaAcademico',
        ),
        migrations.DeleteModel(
            name='UsuarioBienestar',
        ),
    ]
