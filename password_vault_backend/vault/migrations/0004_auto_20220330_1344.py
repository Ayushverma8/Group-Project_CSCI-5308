# Generated by Django 3.2.10 on 2022-03-30 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vault', '0003_vault'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vault',
            name='encrypted_ciphertext',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='vault',
            name='encrypted_remainder',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='vault',
            name='password',
            field=models.TextField(),
        ),
    ]
