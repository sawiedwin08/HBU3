# Generated by Django 5.1 on 2024-12-03 20:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0003_activity_qr_code_identifier_and_more'),
        ('users', '0009_documenttype_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuariobienestar',
            name='dimension',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='activities.dimension'),
        ),
    ]
