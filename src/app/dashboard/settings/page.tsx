import OrganizerSettingsForm from './components/OrganizerSettingsForm';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl mb-6">Configuración del Organizador</h1>
          <OrganizerSettingsForm />
        </div>
      </div>
    </div>
  );
}
