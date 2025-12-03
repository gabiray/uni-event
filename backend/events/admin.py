from django.contrib import admin
from .models import Faculty, Department, Category, Location, Event

# Configurare simpla pentru nomenclatoare
admin.site.register(Faculty)
admin.site.register(Location)
admin.site.register(Category)

# Configurare pentru Departamente (cu filtrare dupa facultate)
@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'faculty')
    list_filter = ('faculty',)

# Configurare complexa pentru Evenimente
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    # Ce coloane vedem in tabel
    list_display = ('title', 'organizer', 'status', 'start_date', 'faculty')
    
    # Filtre in dreapta (foarte utile pt Admin)
    list_filter = ('status', 'faculty', 'category', 'start_date')
    
    # Bara de cautare
    search_fields = ('title', 'organizer__email')

    # --- ACTIUNI RAPIDE ---
    actions = ['approve_events', 'reject_events']

    @admin.action(description='Valideaza evenimentele selectate (Publica)')
    def approve_events(self, request, queryset):
        queryset.update(status='published')

    @admin.action(description='Respinge evenimentele selectate')
    def reject_events(self, request, queryset):
        queryset.update(status='rejected')